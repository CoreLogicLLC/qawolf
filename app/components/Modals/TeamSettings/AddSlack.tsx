import { Slack } from "grommet-icons";
import { MouseEvent, useContext, useRef } from "react";

import { useCreateSlackIntegrationUrl } from "../../../hooks/mutations";
import { routes } from "../../../lib/routes";
import { copy } from "../../../theme/copy";
import IconButton from "../../shared/IconButton";
import { StateContext } from "../../StateContext";
import styles from "./TeamSettings.module.css";

export default function AddSlack(): JSX.Element {
  const isRedirectingRef = useRef(false);

  const { teamId } = useContext(StateContext);

  const [
    createSlackIntegrationUrl,
    { data, loading },
  ] = useCreateSlackIntegrationUrl({
    // include trigger id so we can update that team's alert
    // preferences after they install the Slack app
    redirect_uri: `${routes.slack}/${teamId}`,
  });

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    createSlackIntegrationUrl();
  };

  // if received Slack URL go there
  if (data && data.createSlackIntegrationUrl) {
    isRedirectingRef.current = true;
    window.location.href = data.createSlackIntegrationUrl;
  }

  return (
    <IconButton
      IconComponent={Slack}
      className={styles.addSlack}
      color="black"
      disabled={isRedirectingRef.current || loading}
      iconColor="plain"
      justify="center"
      margin={{ top: "medium" }}
      message={copy.slackIntegration}
      onClick={handleClick}
    />
  );
}