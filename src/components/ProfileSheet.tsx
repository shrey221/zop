import { useState } from "react";
import type { Activity, Profile, Progress } from "../store";
import { streak } from "../store";
import { Avatar } from "./Home";

type Props = {
  profile: Profile;
  activity: Activity;
  progress: Progress;
  close: () => void;
  edit: () => void;
  logout: () => void;
  reset: () => void;
};

export default function ProfileSheet({ profile, activity, progress, close, edit, logout, reset }: Props) {
  const [confirmReset, setConfirmReset] = useState(false);
  const since = new Date(profile.since + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center md:items-center" role="dialog" aria-modal="true" aria-label="Profile">
      <button className="absolute inset-0 animate-fade bg-ink/50 backdrop-blur-sm" onClick={close} aria-label="Close profile" />
      <div className="pb-safe relative w-full max-w-md animate-up rounded-t-[32px] bg-cream px-5 pt-3 shadow-lift md:animate-pop md:rounded-[32px] md:pb-5">
        <div className="mx-auto h-1.5 w-12 rounded-full bg-ink/15 md:hidden" />
        <div className="mt-4 flex items-center gap-4">
          <Avatar name={profile.name} size={68} />
          <div className="min-w-0">
            <h2 className="truncate font-display text-[28px] font-extrabold leading-none">{profile.name}</h2>
            <p className="mt-1.5 text-sm font-bold text-ink-mute">
              Age {profile.age} · Class {profile.cls}
            </p>
            <p className="text-xs font-bold text-ink-mute/80">Learning since {since}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          {[
            [streak(activity.days), "Day streak"],
            [progress.light.found, "Light discoveries"],
            [progress.harappa.solved, "Mysteries solved"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-2xl bg-white p-3 ring-1 ring-black/5">
              <div className="font-display text-2xl font-extrabold leading-none">{v}</div>
              <div className="mt-1 text-[11px] font-extrabold leading-tight text-ink-mute">{l}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-2">
          <button onClick={edit} className="press w-full rounded-2xl bg-white py-3.5 text-[15px] font-extrabold ring-1 ring-black/10">
            ✏️ Edit details
          </button>
          <button onClick={logout} className="press w-full rounded-2xl bg-ink py-3.5 text-[15px] font-extrabold text-white">
            Log out
          </button>
          {confirmReset ? (
            <div className="flex items-center gap-2 rounded-2xl bg-white p-2 ring-1 ring-his/30">
              <span className="flex-1 pl-2 text-sm font-bold">Clear all learning progress?</span>
              <button onClick={() => setConfirmReset(false)} className="rounded-xl px-3 py-2 text-sm font-extrabold text-ink-mute">
                Cancel
              </button>
              <button
                onClick={() => {
                  reset();
                  setConfirmReset(false);
                }}
                className="rounded-xl bg-his px-3 py-2 text-sm font-extrabold text-white"
              >
                Clear
              </button>
            </div>
          ) : (
            <button onClick={() => setConfirmReset(true)} className="w-full py-2 text-sm font-bold text-ink-mute underline-offset-2 hover:underline">
              Reset learning progress
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
