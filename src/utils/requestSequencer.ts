// 같은 상태를 조회 요청과 변경 요청이 함께 갱신할 때, 늦게 도착한 오래된 응답이 최신 상태를 덮어쓰지 않도록
// 요청을 시작한 순서(순번)를 기준으로 응답을 반영할지 판단한다.
//
// - 조회: 자신보다 나중에 시작한 요청의 결과가 이미 반영됐다면 버린다.
// - 변경: 성공 응답은 서버가 실제로 처리한 결과이므로 조회 결과보다 우선한다.
//   반영 시점까지 시작된 조회는 변경 이전 값을 읽었을 수 있어 모두 무효화한다.
//   변경 요청끼리는 나중에 시작한(사용자가 마지막으로 요청한) 결과만 반영한다.
//
// 응답 반영 여부만 판단하며, 서버가 요청을 처리하는 순서는 보장하지 않는다.

export interface RequestTicket {
  // 응답이 도착했을 때 한 번 호출한다. 반영해도 되면 반영한 것으로 기록하고 true를 반환한다.
  commit: () => boolean;
}

export interface RequestSequencer {
  startRead: () => RequestTicket;
  startWrite: () => RequestTicket;
}

export function createRequestSequencer(): RequestSequencer {
  // 마지막으로 시작한 요청의 순번
  let lastStartedSeq = 0;
  // 이 순번 이하로 시작한 조회 응답은 반영하지 않는다.
  let readBaseline = 0;
  // 이 순번 이하로 시작한 변경 응답은 반영하지 않는다.
  let writeBaseline = 0;

  return {
    startRead() {
      lastStartedSeq += 1;
      const seq = lastStartedSeq;
      return {
        commit() {
          if (seq <= readBaseline) return false;
          readBaseline = seq;
          return true;
        },
      };
    },
    startWrite() {
      lastStartedSeq += 1;
      const seq = lastStartedSeq;
      return {
        commit() {
          if (seq <= writeBaseline) return false;
          writeBaseline = seq;
          readBaseline = lastStartedSeq;
          return true;
        },
      };
    },
  };
}
