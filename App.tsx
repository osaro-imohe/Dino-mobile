import "react-native-gesture-handler";
import "react-native-gesture-handler";
import React, { useState, Fragment } from "react";
import Navigation from "./src/navigation/navigation";
import { AppearanceProvider } from "react-native-appearance";
import Modal, { NewGroupModalContext } from "./src/components/NewGroup";
import { ContextProvider } from "./src/context";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import client from "./src/graphql/client";

const App = () => {
  const [modalIsOpen, setModal] = useState(false);
  return (
    <ContextProvider>
      <ApolloProvider client={client}>
        <AppearanceProvider>
          <NewGroupModalContext.Provider
            value={{ isOpen: modalIsOpen, setOpen: setModal }}
          >
            <Fragment>
              <Navigation />
              <Modal isOpen={modalIsOpen} />
            </Fragment>
          </NewGroupModalContext.Provider>
        </AppearanceProvider>
      </ApolloProvider>
    </ContextProvider>
  );
};

export default App;
