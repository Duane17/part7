import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "./NotificationContext";
import { UserProvider } from "./UserContext";
import { BlogProvider } from "./BlogContext";

const queryClient = new QueryClient();

const AppProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogProvider>
        <NotificationProvider>
          <UserProvider>{children}</UserProvider>
        </NotificationProvider>
      </BlogProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
