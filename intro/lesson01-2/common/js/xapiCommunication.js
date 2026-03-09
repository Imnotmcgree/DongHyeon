/**
 * OctoPlayer xAPI 통신 관리 클래스
 */
class OctoPlayerXAPI {
    constructor() {
        this.contentId = null;
        this.contentTag = null;
        this.userId = null;
        this.initialized = false;
        this.startTime = null;
        this.currentStage = 1;
        this.totalStages = 2;  // 미션1, 미션2
        this.restoreData = null;
        console.log('OctoPlayerXAPI 초기화됨');
    }

    /**
     * 콘텐츠에서 뷰어로 로그 전송
     * @param {Object} xapiData - 전송할 xAPI 데이터
     */
    sendLogToContainer(xapiData) {
        // 항상 globalThis.extData에서 최신값을 사용
        const contentId = (globalThis.extData && globalThis.extData.contentId) || this.contentId || "default-id";
        const contentTag = (globalThis.extData && globalThis.extData.contentTag) || this.contentTag || {};
        const message = {
            type: 'sendLogToContainer',
            data: {
                contentId: contentId,
                contentTag: contentTag,
                restore: this.restoreData || {},
                xAPI: xapiData
            }
        };
        console.log('뷰어로 전송된 메시지:', message);
        window.parent.postMessage(message, '*');
    }

    /**
     * 액티비티 시작 로그 전송
     */
    sendActivityStarted() {
        this.startTime = new Date();
        this.sendLogToContainer({
            verb: 'started',
        });
    }

    /**
     * 스테이지 시작 로그 전송
     * @param {number} stageNum - 스테이지 번호
     */
    sendStageStarted(stageNum) {
        this.currentStage = stageNum;
        this.sendLogToContainer({
            verb: 'started',
            type: 'web-content-stage',
            stageNum: `_${stageNum}`,
            reqComCount: 2,
            comComCount: 0,
            progress: 0
        });
    }

    /**
     * 스테이지 종료 로그 전송
     * @param {number} stageNum - 스테이지 번호
     * @param {number} completedCount - 완료한 문제 수
     */


    /**
     * 액티비티 종료 로그 전송
     */


    /**
     * 액티비티 다시 시작 로그 전송
     */
    sendActivityRestarted() {
        this.sendLogToContainer({
            verb: 'reset',
        });
    }

    /**
     * 액티비티 이탈 로그 전송
     */
    sendActivityLeft() {
        this.sendLogToContainer({
            verb: 'left',
        });
    }

    /**
     * 콘텐츠 복원 데이터 요청
     */
    requestRestoreData() {
        const message = {
            type: 'requestRestoreData'
        };
        window.parent.postMessage(message, '*');
    }

    /**
     * 사용자 ID 요청
     */
    requestUserId() {
        const message = {
            type: 'requestUserId'
        };
        window.parent.postMessage(message, '*');
    }

    /**
     * 현재 iframe 페이지 정보 전송
     * @param {number} data - 현재 페이지 번호
     * @param {number} height - iframe 높이
     */
    sendIframeCurrentPage(data, height = 800) {
        const message = {
            type: 'iframeCurrentPage',
            data: data,
            height: height
        };
        window.parent.postMessage(message, '*');
    }

    /**
     * 현재 HTML 페이지 정보 전송
     * @param {number} data - 현재 페이지 번호
     * @param {number} width - 콘텐츠 너비
     * @param {number} height - 콘텐츠 높이
     */
    sendHtmlCurrentPage(data, width = 1280, height = 800) {
        const message = {
            type: 'htmlCurrentPage',
            data: data,
            width: width,
            height: height
        };
        window.parent.postMessage(message, '*');
    }

    /**
     * 다국어 번역 설정
     * @param {string} source - 원본 언어
     * @param {string} target - 대상 언어
     * @param {string} key - 번역 키
     */
    setTranslation(source = 'ko', target = 'en', key = '') {
        const message = {
            type: 'setTranslation',
            source: source,
            target: target,
            key: key
        };
        window.parent.postMessage(message, '*');
    }

    /**
     * 메시지 수신 이벤트 리스너 설정
     */
    initMessageListener() {
        console.log('메시지 리스너 초기화');
        window.addEventListener('message', (event) => {
            const message = event.data;
            console.log('수신된 메시지:', message);

            switch (message.type) {
                case 'sendRestoreData':
                    this.handleRestoreData(message);
                    break;
                case 'sendUserId':
                    this.handleUserId(message.data);
                    break;
                case 'terminated':
                    this.handleTerminated();
                    break;
            }
        });
    }

    /**
     * 복원 데이터 처리
     * @param {Object} data - 복원 데이터
     */
    handleRestoreData(data) {
        this.contentId = data.contentId;
        this.contentTag = data.contentTag;
        this.restoreData = data.restore || {};
        // userId가 여러 경로로 올 수 있으니 모두 체크
        if (data.userId) {
            this.userId = data.userId;
        } else if (data.restore && data.restore.userId) {
            this.userId = data.restore.userId;
        }
        console.log('Restore data received:', data);

        // globalThis.extData에도 값 할당 (외부 참조용)
        globalThis.extData = {
            contentId: data.contentId,
            contentTag: data.contentTag,
            contentName: data.contentsName || ''
        };


        // globalThis.extData에도 값 할당 (외부 참조용)
        globalThis.extData = {
            contentId: data.contentId,
            contentTag: data.contentTag,
            contentName: data.contentsName || ''
        };

        // restoreData 수신 후 started 로그 전송
        this.sendStartedLog();
    }

    /**
     * 사용자 ID 처리
     * @param {string} userId - 사용자 ID
     */
    handleUserId(userId) {
        this.userId = userId;
        console.log('User ID received:', userId);
    }

    /**
     * 종료 처리
     */


    /**
     * 초기화
     */
    init() {
        if (!this.initialized) {
            this.initMessageListener();
            this.requestUserId();
            this.requestRestoreData();
            this.initialized = true;
            this.startTime = new Date();
            // this.sendActivityStarted();
        }
    }

    /**
     * started 로그 전송 (apitest.js SendStartMsg와 동일 구조)
     */
    sendStartedLog() {
        const message = {
            type: "sendLogToContainer",
            data: {
                timestamp: (new Date()).toISOString(),
                xAPI: {
                    verb: "started",
                    context: {
                        extensions: {
                            "lcms/conts-id": this.contentId || "default-id"
                        }
                    },
                    object: {
                        id: "" + (this.contentId || "default-id")
                    }
                },
                contentId: this.contentId || "default-id",
                contentTag: this.contentTag || {}
            }
        };
        window.parent.postMessage(message, "*");
    }

    /**
     * left 로그 전송 (apitest.js SendLeftMsg와 동일 구조)
     */
    sendLeftLog() {
        const durationSec = this.startTime ? Math.floor((Date.now() - this.startTime.getTime()) / 1000) : 0;
        const message = {
            type: "sendLogToContainer",
            data: {
                timestamp: (new Date()).toISOString(),
                xAPI: {
                    context: {
                        extensions: {
                            "lcms/conts-id": this.contentId || "default-id"
                        }
                    },
                    verb: "left",
                    object: {
                        id: "" + (this.contentId || "default-id")
                    },
                    result: {
                        duration: "PT" + durationSec + "S"
                    }
                },
                contentId: this.contentId || "default-id",
                contentTag: this.contentTag || {}
            }
        };
        window.parent.postMessage(message, "*");
    }

    /**
     * reset 로그 전송 (apitest.js SendResetMsg와 동일 구조)
     */
    sendResetLog() {
        const message = {
            type: "sendLogToContainer",
            data: {
                timestamp: (new Date()).toISOString(),
                xAPI: {
                    verb: "reset",
                    context: {
                        extensions: {
                            "lcms/conts-id": this.contentId || "default-id"
                        }
                    },
                    object: {
                        id: "" + (this.contentId || "default-id")
                    }
                },
                contentId: this.contentId || "default-id",
                contentTag: this.contentTag || {}
            }
        };
        window.parent.postMessage(message, "*");
    }
}

// 전역 인스턴스 생성
const octoPlayerXAPI = new OctoPlayerXAPI();

// DOM이 로드되면 초기화
document.addEventListener('DOMContentLoaded', () => {
    console.log('xAPI 통신 초기화 시작');
    octoPlayerXAPI.init();
});

(function () {
    // 페이지 진입 시각 저장
    window.__pageInTime = new Date();

    // 페이지 이탈 시 실행할 함수
    function sendPageOutXAPI() {
        try {
            octoPlayerXAPI.sendLeftLog();
            // 메시지가 전송될 수 있도록 약간 지연 (꼼수지만 필수)
            const start = Date.now();
            while (Date.now() - start < 100) {} // 100ms
        } catch (e) {
            console.warn('xAPI 전송 중 오류:', e);
        }
    }
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') {
            sendPageOutXAPI();
        }
    });


})();