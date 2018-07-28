export const types = {
  appReady: 'app/APP_READY',
  loadingOverlay: 'app/LOADING_OVERLAY',
  loadingIndicatorVisible: 'app/LOADING_INDICATOR_VISIBLE',
};

const initialState = {
  isReady: false,
  loadingIndicatorVisible: false,
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
    case types.appReady:
      return { isReady: action.value || !state.isReady };

    case types.loadingIndicatorVisible:
      return { ...state, loadingIndicatorVisible: action.value };

    case types.loadingOverlay:
      return action.value === true ?
      {
        ...state,
        loadingOverlayIndicatorVisible: action.value,
        loadingOverlayIndicatorText: action.text
      } :
      {
        ...state,
        loadingOverlayIndicatorVisible: action.value,
        loadingOverlayIndicatorText: null
      };

		default:
			return state;
	}
};

export default appReducer;
