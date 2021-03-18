import { Box, Divider, TextField } from "@material-ui/core";
import { Package } from "./Package";
import { format } from "date-fns";
import Text from "../../components/Text";
import EventList from "./EventList";
import { useMemo } from "react";
import styled from "@emotion/styled";

export default function PackageView() {
  const data: Package = useMemo(() => require("./data.json"), []);
  if (!data) return null;

  return (
    <Container>
      <Section>
        <h2>Package</h2>
        <div>
          <Text
            label="Expected delivery"
            value={format(new Date(data.expectedDelivery), "dd/MM-yyyy HH:mm")}
          />
          <Text label="Weight" value={data.weightKg + " kg"} />
        </div>
      </Section>
      <Section>
        <h2>Receiver</h2>
        <div>
          <Text label="Address" value={data.receiverAddress} />
          <Text label="Name" value={data.receiverName} />
        </div>
      </Section>
      <Section>
        <h2>Sender</h2>
        <div>
          <Text label="Address" value={data.senderAddress} />
          <Text label="Name" value={data.senderName} />
        </div>
      </Section>
      <Section>
        <h2>Events</h2>
        <EventList events={data.history} />
      </Section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  width: 420px;
  padding: 40px;
  border: 1px solid rgba(0,0,0,0.23);
  border-radius: 40px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  div {
    flex-grow: 0;
    margin-right: 4px;
  }
`;
