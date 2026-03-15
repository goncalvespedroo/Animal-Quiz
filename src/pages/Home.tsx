import { Title } from "../components/Title";
import { Text } from "../components/Text";
import { Button } from "../components/Button";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center flex-col">
      <Title text="Animal Quiz." variant="primary" />
      <Text variant="primary">
        This is a quick Game Quiz developed by {""}
        <a href="https://github.com/goncalvespedroo">Pedro Gonçalves</a>
      </Text>
      <Button variant="start">start</Button>
    </div>
  );
}
