import Swal from "sweetalert2";

const MAN_UP = "MAN_UP";
const MAN_DOWN = "MAN_DOWN";
const CHILD_UP = "CHILD_UP";
const CHILD_DOWN = "CHILD_DOWN";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const LOGIN_MODAL_SHOW = "LOGIN_MODAL_SHOW";
const LOGIN_MODAL_HIDE = "LOGIN_MODAL_HIDE";
const INIT_SIGN_UP_DATA = "INIT_SIGN_UP_DATA";
const SIGN_UP_MODAL_SHOW = "SIGN_UP_MODAL_SHOW";
const SIGN_UP_MODAL_HIDE = "SIGN_UP_MODAL_HIDE";
const CHECK_ORDER_MODAL_SHOW = "CHECK_ORDER_MODAL_SHOW";
const MEMBER_ORDER_MODAL_HIDE = "MEMBER_ORDER_MODAL_HIDE";
const ROOM_ORDER_DATE = "ROOM_ORDER_DATE";
const STANDARD_ROOM_ORDER_NUMBER = "STANDARD_ROOM_ORDER_NUMBER";
const JUNIOR_SUITE_ORDER_NUMBER = "JUNIOR_SUITE_ORDER_NUMBER";
const SUPERIOR_ROOM_ORDER_NUMBER = "SUPERIOR_ROOM_ORDER_NUMBER";
const PER_ROOM_MAX = "PER_ROOM_MAX";
const CHECK_ORDER_DELETE = "CHECK_ORDER_DELETE";

const initState = {
  man: 1,
  child: 0,
  standardRoom: 0,
  juniorSuite: 0,
  superiorRoom: 0,
  standardRoomMax: null,
  juniorSuiteMax: null,
  superiorRoomMax: null,
  logStatus: false,
  logMethod: null,
  logInModalStatus: false,
  signUpModalStatus: false,
  checkOrderModalStatus: false,
  roomModalStatus: false,
  memberId: null,
  memberName: null,
  memberEmail: null,
  memberSecondId: null,
  startDate: null,
  endDate: null,
  memberCheck: async (useWeb, id) => {
    const req = {};
    if (useWeb == "facebook") {
      req.FacebookId = id;
    } else if (useWeb == "line") {
      req.LineId = id;
    } else {
      req.ID = id;
    }

    return await fetch("/api/member/memberlogin", {
      method: "POST",
      body: JSON.stringify(req),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => {
        if (res.status == 204) {
          return "first_login";
        } else {
          return res.json();
        }
      })
      .catch((error) => error);
  },
  eventAlert: (successText) => {
    let timerInterval;
    Swal.fire({
      title: successText,
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
  },
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    // Search room
    case MAN_UP:
      return {
        ...state,
        man: state.man + 1,
      };
    case MAN_DOWN:
      return {
        ...state,
        man: state.man - 1,
      };
    case CHILD_UP:
      return {
        ...state,
        child: state.child + 1,
      };
    case CHILD_DOWN:
      return {
        ...state,
        child: state.child - 1,
      };

    // Room Order Data Control
    case ROOM_ORDER_DATE:
      return {
        ...state,
        startDate: action.startDate ?? state.startDate,
        endDate: action.endDate ?? state.endDate,
      };

    case STANDARD_ROOM_ORDER_NUMBER:
      return {
        ...state,
        standardRoom:
          action.event === "PLUS"
            ? state.standardRoom + 1
            : state.standardRoom - 1,
      };

    case JUNIOR_SUITE_ORDER_NUMBER:
      return {
        ...state,
        juniorSuite:
          action.event === "PLUS"
            ? state.juniorSuite + 1
            : state.juniorSuite - 1,
      };

    case SUPERIOR_ROOM_ORDER_NUMBER:
      return {
        ...state,
        superiorRoom:
          action.event === "PLUS"
            ? state.superiorRoom + 1
            : state.superiorRoom - 1,
      };

    case PER_ROOM_MAX:
      return {
        ...state,
        standardRoomMax: action.standardRoomMax,
        juniorSuiteMax: action.juniorSuiteMax,
        superiorRoomMax: action.superiorRoomMax,
      };

    case CHECK_ORDER_DELETE:
      return {
        ...state,
        standardRoom: action.StandardRoom ?? state.standardRoom,
        juniorSuite: action.JuniorSuite ?? state.juniorSuite,
        superiorRoom: action.SuperiorRoom ?? state.superiorRoom,
      };

    // Member Order Modal
    case CHECK_ORDER_MODAL_SHOW:
      return {
        ...state,
        checkOrderModalStatus: true,
      };

    case MEMBER_ORDER_MODAL_HIDE:
      return {
        ...state,
        checkOrderModalStatus: false,
      };

    // SignUp Modal
    case INIT_SIGN_UP_DATA:
      return {
        ...state,
        memberName: action.memberName,
        memberEmail: action.memberEmail,
        memberSecondId: action.memberSecondId,
        logMethod: action.logMethod,
      };
    case SIGN_UP_MODAL_SHOW:
      return {
        ...state,
        signUpModalStatus: true,
      };

    case SIGN_UP_MODAL_HIDE:
      return {
        ...state,
        signUpModalStatus: false,
      };

    // LogIn Modal
    case LOGIN_MODAL_SHOW:
      return {
        ...state,
        loginModalStatus: true,
      };

    case LOGIN_MODAL_HIDE:
      return {
        ...state,
        loginModalStatus: false,
      };

    // Log Status
    case LOG_IN:
      return {
        ...state,
        logStatus: true,
        memberName: action.memberName,
        memberId: action.memberId,
        memberEmail: action.memberEmail,
        logMethod: action.logMethod,
      };

    case LOG_OUT:
      return {
        ...state,
        logStatus: false,
        logMethod: null,
        memberName: null,
        memberId: null,
        memberEmail: null,
      };

    default:
      return state;
  }
};

export default reducer;
