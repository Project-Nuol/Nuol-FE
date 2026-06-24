import { Component, type ReactNode } from 'react';

/**
 * 3D 캔버스 전용 에러 바운더리.
 * WebGL 컨텍스트 손실/미지원 등으로 R3F가 throw해도 히어로(텍스트·버튼)는 살아남도록
 * 실패 시 조용히 null을 렌더한다. (3D는 어디까지나 장식 레이어)
 */
export class HeroCanvasBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
