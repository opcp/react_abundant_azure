import Swal from "sweetalert2";

const MAN = "MAN";
const CHILD = "CHILD";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const LOGIN_MODAL = "LOGIN_MODAL";
const INIT_SIGN_UP_DATA = "INIT_SIGN_UP_DATA";
const LOGIN_INPUT_CHANGE = "LOGIN_INPUT_CHANGE";
const SIGN_UP_MODAL = "SIGN_UP_MODAL";
const RESERVE_ORDER_MODAL = "RESERVE_ORDER_MODAL";
const MEMBER_ORDER_MODAL = "MEMBER_ORDER_MODAL";
const FETCH_MEMBER_ORDER = "FETCH_MEMBER_ORDER";
const ROOM_ORDER_DATE = "ROOM_ORDER_DATE";
const STANDARD_ROOM_ORDER_NUMBER = "STANDARD_ROOM_ORDER_NUMBER";
const JUNIOR_SUITE_ORDER_NUMBER = "JUNIOR_SUITE_ORDER_NUMBER";
const SUPERIOR_ROOM_ORDER_NUMBER = "SUPERIOR_ROOM_ORDER_NUMBER";
const PER_ROOM_MAX = "PER_ROOM_MAX";
const CHECK_ORDER_DELETE = "CHECK_ORDER_DELETE";
const VERIFY_EMAIL_TIMER = "VERIFY_EMAIL_TIMER";

const initState = {
  man: 1,
  child: 0,
  standardRoom: 0,
  juniorSuite: 0,
  superiorRoom: 0,
  standardRoomMax: null,
  juniorSuiteMax: null,
  superiorRoomMax: null,
  account: null,
  password: null,
  logStatus: false,
  logMethod: null,
  logInModalStatus: false,
  signUpModalStatus: false,
  reserveOrderModalStatus: false,
  memberOrderModalStatus: false,
  roomModalStatus: false,
  memberId: null,
  memberName: null,
  memberEmail: null,
  memberEnable: null,
  memberOrder: null,
  memberSecondId: null,
  verifyEmailTimer:null,
  startDate: null,
  endDate: null,
  memberCheck: async (useWeb, userData) => {
    const req = {};
    if (useWeb === "facebook") {
      req.FacebookId = userData;
    } else if (useWeb === "line") {
      req.LineId = userData;
    } else if (useWeb === "web") {
      req.Email = userData.account;
      req.Password = userData.password;
    }
    return await fetch("/api/member/memberlogin", {
      method: "POST",
      body: JSON.stringify(req),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        //5145460958814056
        if (res.state) {
          return res.state;
        } else {
          return res;
        }
      })
      .catch((error) => error);
  },
  memberOrder: null,
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
    case MAN:
      return {
        ...state,
        man: action.man === "UP" ? state.man + 1 : state.man - 1,
      };
    case CHILD:
      return {
        ...state,
        child: action.child === "UP" ? state.child + 1 : state.child - 1,
      };
    case ROOM_ORDER_DATE:
      return {
        ...state,
        startDate: action.startDate ?? state.startDate,
        endDate: action.endDate ?? state.endDate,
      };

    // Room Order Data Control
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

    // Reserve Order Modal
    case RESERVE_ORDER_MODAL:
      return {
        ...state,
        reserveOrderModalStatus: action.reserveOrderModalStatus,
      };

    // Member Order Modal
    case FETCH_MEMBER_ORDER:
      return {
        ...state,
        memberOrder: action.memberOrder,
      };

    case MEMBER_ORDER_MODAL:
      return {
        ...state,
        memberOrderModalStatus: action.memberOrderModalStatus,
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

    case SIGN_UP_MODAL:
      return {
        ...state,
        signUpModalStatus: action.signUpModalStatus,
      };

    // LogIn Modal
    case LOGIN_MODAL:
      return {
        ...state,
        loginModalStatus: action.loginModalStatus,
      };

    case LOGIN_INPUT_CHANGE:
      return {
        ...state,
        account: action.account ?? state.account,
        password: action.password ?? state.password,
      };

    // Log Status
    case LOG_IN:
      return {
        ...state,
        logStatus: true,
        memberName: action.memberName,
        memberId: action.memberId,
        memberEmail: action.memberEmail,
        memberEnable: action.memberEnable,
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
        memberSecondId: null,
      };

      // verify Email Timer
      case VERIFY_EMAIL_TIMER:
        return{
          ...state,
          verifyEmailTimer:action.time
        }

    default:
      return state;
  }
};

export default reducer;
