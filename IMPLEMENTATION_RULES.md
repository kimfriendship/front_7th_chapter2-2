# React 유사 프레임워크 구현 규칙

## 📋 프로젝트 목표

**최종 목표**: 모든 테스트 코드 통과

## 🎯 핵심 규칙

1. **주석 필수**: 각 함수 구현 시 이해할 수 있는 한글 주석을 반드시 추가해야 함
2. **순차 진행**: Phase는 반드시 순서대로 진행 (Phase 1 → Phase 2 → ... → Phase 6)
3. **Phase 완료 시 확인**: 각 Phase가 완료되면 반드시 사용자에게 확인(confirm)을 받고 다음 Phase로 진행
4. **주석 기반 구현**: 코드에 달려있는 주석을 보고 하나하나 차근차근 구현
5. **테스트 중심**: 구현 후 테스트 통과 여부 확인

## 📂 구현 순서 (Phase별)

### Phase 1 · VNode와 기초 유틸리티

**파일 목록**:
- `core/elements.ts`: `createElement`, `normalizeNode`, `createChildPath`
- `utils/validators.ts`: `isEmptyValue`
- `utils/equals.ts`: `shallowEquals`, `deepEquals`

**설명**: 
- VNode(가상 DOM 노드) 생성 및 정규화
- 기초 유틸리티 함수 구현 (값 비교, 빈 값 체크 등)

---

### Phase 2 · 컨텍스트와 루트 초기화

**파일 목록**:
- `core/context.ts`: 루트/훅 컨텍스트와 경로 스택 관리
- `core/setup.ts`: 컨테이너 초기화, 컨텍스트 리셋, 루트 렌더 트리거
- `client/index.ts`: `createRoot().render()` API 노출

**설명**:
- 전역 컨텍스트 관리 시스템 구현
- 렌더링 루트 초기화 및 설정

---

### Phase 3 · DOM 인터페이스 구축

**파일 목록**:
- `core/dom.ts`: 속성/스타일/이벤트 적용 규칙, DOM 노드 탐색/삽입/제거

**설명**:
- 실제 DOM 조작 함수 구현
- 속성, 스타일, 이벤트 핸들러 처리

---

### Phase 4 · 렌더 스케줄링

**파일 목록**:
- `utils/enqueue.ts`: `enqueue`, `withEnqueue`로 마이크로태스크 큐 구성
- `core/render.ts`: `render`, `enqueueRender`로 루트 렌더 사이클 구현

**설명**:
- 비동기 렌더링 스케줄링 시스템
- 마이크로태스크를 이용한 배치 업데이트

---

### Phase 5 · Reconciliation

**파일 목록**:
- `core/reconciler.ts`: 마운트/업데이트/언마운트, 자식 비교, key/anchor 처리
- `core/dom.ts`: Reconciliation에서 사용할 DOM 재배치 보조 함수 확인

**설명**:
- Virtual DOM diffing 알고리즘
- 효율적인 DOM 업데이트

---

### Phase 6 · 기본 Hook 시스템

**파일 목록**:
- `core/hooks.ts`: 훅 상태 저장, `useState`, `useEffect`, cleanup/queue 관리
- `core/context.ts`: 훅 커서 증가, 방문 경로 기록, 미사용 훅 정리

**설명**:
- useState, useEffect 등 기본 훅 구현
- 훅의 상태 관리 및 생명주기 처리

---

## ✅ 체크리스트

- [ ] Phase 1: VNode와 기초 유틸리티 → **완료 시 사용자 확인 필요**
- [ ] Phase 2: 컨텍스트와 루트 초기화 → **완료 시 사용자 확인 필요**
- [ ] Phase 3: DOM 인터페이스 구축 → **완료 시 사용자 확인 필요**
- [ ] Phase 4: 렌더 스케줄링 → **완료 시 사용자 확인 필요**
- [ ] Phase 5: Reconciliation → **완료 시 사용자 확인 필요**
- [ ] Phase 6: 기본 Hook 시스템 → **완료 시 사용자 확인 필요**
- [ ] 모든 테스트 통과 확인

## 🔄 작업 진행 방식

1. 각 Phase의 파일들을 순서대로 구현
2. 주석으로 달린 구현 사항들을 하나씩 구현
3. 코드에 이해하기 쉬운 한글 주석 추가
4. Phase 완료 후 **반드시 사용자에게 확인 요청**
5. 사용자 승인 후 다음 Phase로 진행

## 📝 구현 시 주의사항

- 함수 구현 시 동작 원리를 설명하는 주석 필수
- React의 동작 방식과 유사하게 구현
- 테스트 케이스를 참고하여 정확한 동작 구현
- 엣지 케이스 고려 (null, undefined, 빈 배열 등)

