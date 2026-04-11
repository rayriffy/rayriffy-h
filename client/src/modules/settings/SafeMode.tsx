import { settingsAtom, useSettingsAtom } from "modules/atoms/settingsAtom";

export const SafeMode = () => {
  const { safemode } = useSettingsAtom();

  return (
    <section className="card bg-base-100 border border-base-300">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="card-title">Safe mode</h2>
            <p>Blur image to prevent public incident</p>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            defaultChecked={safemode}
            onClick={() => settingsAtom.setKey("safemode", !safemode)}
          />
        </div>
      </div>
    </section>
  );
};
