import { context } from "./context";
import { getDomNodes, insertInstance } from "./dom";
import { reconcile } from "./reconciler";
import { cleanupUnusedHooks } from "./hooks";
import { withEnqueue } from "../utils";

/**
 * 루트 컴포넌트의 렌더링을 수행하는 함수입니다.
 * `enqueueRender`에 의해 스케줄링되어 호출됩니다.
 */
export const render = (): void => {
  // 컨테이너나 노드가 없으면 렌더링할 수 없음
  if (!context.root.container || !context.root.node) {
    return;
  }

  // 1. 훅 컨텍스트의 visited 집합 초기화
  // 현재 렌더 사이클에서 방문한 경로들을 추적하기 위해 초기화
  context.hooks.visited.clear();

  // 2. reconcile 함수를 호출하여 루트 노드를 재조정
  // 이전 인스턴스와 새 VNode를 비교하여 DOM을 업데이트
  context.root.instance = reconcile(
    context.root.container,      // 부모 DOM 컨테이너
    context.root.instance,        // 이전 인스턴스 (null이면 초기 렌더링)
    context.root.node,            // 새로운 VNode
    "0",                          // 루트 경로
  );

  // 루트 인스턴스가 생성되지 않았으면 (reconcile이 null 반환) 처리
  // 초기 렌더링에서는 DOM에 삽입해야 함
  if (context.root.instance && !context.root.instance.dom?.parentNode) {
    insertInstance(context.root.container, context.root.instance);
  }

  // 3. 사용되지 않은 훅들을 정리
  // visited에 포함되지 않은 경로의 훅들은 더 이상 사용되지 않으므로 정리
  cleanupUnusedHooks();
};

/**
 * `render` 함수를 마이크로태스크 큐에 추가하여 중복 실행을 방지합니다.
 */
export const enqueueRender = withEnqueue(render);
