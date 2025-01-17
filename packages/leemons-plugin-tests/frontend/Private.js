import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import loadable from '@loadable/component';
import pMinDelay from 'p-min-delay';
import { LoadingOverlay } from '@bubbles-ui/components';
import { useSession } from '@users/session';
import { goLoginPage } from '@users/navigate';

const TestsList = loadable(() => pMinDelay(import('./src/pages/private/tests/List'), 1000));
const TestsEdit = loadable(() => pMinDelay(import('./src/pages/private/tests/Edit'), 1000));
const TestsAssign = loadable(() => pMinDelay(import('./src/pages/private/tests/Assign'), 1000));
const TestsDetail = loadable(() => pMinDelay(import('./src/pages/private/tests/Detail'), 1000));
const TestsResult = loadable(() => pMinDelay(import('./src/pages/private/tests/Result'), 1000));
const QuestionBanksList = loadable(() =>
  pMinDelay(import('./src/pages/private/questions-banks/List'), 1000)
);
const QuestionBankDetail = loadable(() =>
  pMinDelay(import('./src/pages/private/questions-banks/Detail'), 1000)
);
const StudentInstance = loadable(() =>
  pMinDelay(import('./src/pages/private/tests/StudentInstance/index'), 1000)
);

export default function Private() {
  const { path } = useRouteMatch();
  const session = useSession({ redirectTo: goLoginPage });

  return (
    <Switch>
      <Route path={`${path}/result/:id/:user`}>
        <TestsResult session={session} fallback={<LoadingOverlay visible />} />
      </Route>
      <Route path={`${path}/result/:id`}>
        <TestsResult session={session} fallback={<LoadingOverlay visible />} />
      </Route>
      <Route path={`${path}/student/:id/:user`}>
        <StudentInstance session={session} fallback={<LoadingOverlay visible />} />
      </Route>
      <Route path={`${path}/student/:id`}>
        <StudentInstance session={session} fallback={<LoadingOverlay visible />} />
      </Route>
      <Route path={`${path}/questions-banks/:id`}>
        <QuestionBankDetail session={session} fallback={<LoadingOverlay visible />} />
      </Route>
      <Route path={`${path}/questions-banks`}>
        <QuestionBanksList session={session} fallback={<LoadingOverlay visible />} />
      </Route>
      <Route path={`${path}/detail/:id`}>
        <TestsDetail session={session} fallback={<LoadingOverlay visible />} />
      </Route>
      <Route path={`${path}/assign/:id`}>
        <TestsAssign session={session} fallback={<LoadingOverlay visible />} />
      </Route>
      <Route path={`${path}/:id`}>
        <TestsEdit session={session} fallback={<LoadingOverlay visible />} />
      </Route>
      <Route path={`${path}`}>
        <TestsList session={session} fallback={<LoadingOverlay visible />} />
      </Route>
    </Switch>
  );
}
