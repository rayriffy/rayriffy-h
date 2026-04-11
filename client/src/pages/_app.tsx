import { Dock } from "modules/layout/Dock";
import type { FunctionComponent } from "react";
import { Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEden } from "modules/utils/useEden";
import { usePath } from "modules/utils/usePath";
import { CenterLayout } from "modules/layout/CenterLayout";
import { MissingServer } from "modules/listings/MissingServer";

const queryClient = new QueryClient();

const App: FunctionComponent = () => {
  const { pathname } = usePath();
  const eden = useEden();

  return (
    <QueryClientProvider client={queryClient}>
      <main className="pb-16">
        {eden === null && pathname !== "/settings" ? (
          <CenterLayout className="h-[calc(100dvh-4rem)]">
            <MissingServer />
          </CenterLayout>
        ) : (
          <Outlet />
        )}
      </main>
      <Dock />
    </QueryClientProvider>
  );
};

export default App;
