import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { observer, Provider as MOBXProvider } from "mobx-react";
import theme from "./theme";
import { mobxStores } from "./store";
import {Layout} from "./layout";

const App = observer(() => {
  return (
      <MOBXProvider {...mobxStores}>
        <ThemeProvider theme={createTheme(theme)}>
          <Layout />
        </ThemeProvider>
      </MOBXProvider>
  );
});

export default App;
