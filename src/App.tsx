import { useCallback, useEffect, useState } from "react";
import type { ModuleId, SubjectId } from "./catalog";
import Home from "./components/Home";
import Login from "./components/Login";
import Player from "./components/Player";
import ProfileSheet from "./components/ProfileSheet";
import Splash from "./components/Splash";
import SubjectView from "./components/SubjectView";
import {
  Activity,
  Profile,
  loadActivity,
  loadProfile,
  loadProgress,
  recordOpen,
  recordVisit,
  resetProgress,
  saveProfile,
} from "./store";

// Everything on screen is described by this, and it lives in browser history,
// so the phone's back button closes a module / sheet / subject like a native app.
type Nav = { subject?: SubjectId; player?: ModuleId; sheet?: boolean; edit?: boolean };

type InstallEvent = Event & { prompt: () => Promise<void> };

export default function App() {
  const [splash, setSplash] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(() => loadProfile());
  const [nav, setNav] = useState<Nav>({});
  const [activity, setActivity] = useState<Activity>(() => loadActivity());
  const [progress, setProgress] = useState(() => loadProgress());
  const [installEvt, setInstallEvt] = useState<InstallEvent | null>(null);

  useEffect(() => {
    history.replaceState({}, "");
    const pop = (e: PopStateEvent) => setNav((e.state as Nav) ?? {});
    const refresh = () => setProgress(loadProgress());
    const onInstall = (e: Event) => {
      e.preventDefault();
      setInstallEvt(e as InstallEvent);
    };
    window.addEventListener("popstate", pop);
    window.addEventListener("focus", refresh);
    window.addEventListener("beforeinstallprompt", onInstall);
    window.addEventListener("appinstalled", () => setInstallEvt(null));
    return () => {
      window.removeEventListener("popstate", pop);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("beforeinstallprompt", onInstall);
    };
  }, []);

  useEffect(() => {
    if (profile) setActivity(recordVisit());
  }, [profile]);

  // Coming back from a module: pick up the progress it saved.
  useEffect(() => {
    if (!nav.player) setProgress(loadProgress());
  }, [nav.player]);

  const go = useCallback((next: Nav) => {
    history.pushState(next, "");
    setNav(next);
  }, []);
  const back = useCallback(() => history.back(), []);

  const endSplash = useCallback(() => setSplash(false), []);

  if (splash) return <Splash onDone={endSplash} />;

  if (!profile || nav.edit) {
    return (
      <Login
        key={nav.edit ? "edit" : "new"}
        initial={nav.edit ? profile : null}
        onDone={(p) => {
          saveProfile(p);
          setProfile(p);
          if (nav.edit) back();
          else {
            history.replaceState({}, "");
            setNav({});
          }
        }}
      />
    );
  }

  return (
    <>
      <div className={nav.player ? "hidden" : ""}>
        {nav.subject ? (
          <SubjectView
            id={nav.subject}
            progress={progress}
            back={back}
            openModule={(id) => {
              setActivity(recordOpen(id));
              go({ ...nav, player: id });
            }}
          />
        ) : (
          <Home
            profile={profile}
            activity={activity}
            progress={progress}
            openSubject={(id) => {
              go({ subject: id });
              window.scrollTo(0, 0);
            }}
            openModule={(id) => {
              setActivity(recordOpen(id));
              go({ player: id });
            }}
            openProfile={() => go({ ...nav, sheet: true })}
            install={
              installEvt
                ? () => {
                    installEvt.prompt();
                    setInstallEvt(null);
                  }
                : null
            }
          />
        )}
      </div>

      {nav.player && <Player id={nav.player} close={back} />}

      {nav.sheet && (
        <ProfileSheet
          profile={profile}
          activity={activity}
          progress={progress}
          close={back}
          edit={() => {
            history.replaceState({ edit: true }, "");
            setNav({ edit: true });
          }}
          logout={() => {
            saveProfile(null);
            setProfile(null);
            history.replaceState({}, "");
            setNav({});
          }}
          reset={() => {
            resetProgress();
            setProgress(loadProgress());
            setActivity(recordVisit());
          }}
        />
      )}
    </>
  );
}
