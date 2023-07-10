import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./reducers/accountReducer";
import monkeezReducer from "./reducers/monkeezReducer";
import zoogzReducer from "./reducers/zoogzReducer";
import itemShopReducer from "./reducers/itemShopReducer";
import mnkzReducer from "./reducers/mnkzReducer";
import leaderboardReducer from "./reducers/zoogzLeaderboardReducer";
import zungleReducer from "./reducers/zungleReducer";
import zungleItemReducer from "./reducers/zungleItemReducer";
import cratezReducer from "./reducers/cratezReducer";
import alertReducer from "./reducers/alertReducer";
import zscoreLeaderboardReducer from "./reducers/zscoreLeaderboard";
import popupReducer from "./reducers/popupReducer";

export default configureStore({
  reducer: {
    account: accountReducer,
    monkeez: monkeezReducer,
    zoogz: zoogzReducer,
    itemShop: itemShopReducer,
    mnkz: mnkzReducer,
    zoogzLeaderboard: leaderboardReducer,
    zungle: zungleReducer,
    zungleItems: zungleItemReducer,
    cratez: cratezReducer,
    alerts: alertReducer,
    zscoreLeaderboard: zscoreLeaderboardReducer,
    zunglePopup: popupReducer,
  },
});
