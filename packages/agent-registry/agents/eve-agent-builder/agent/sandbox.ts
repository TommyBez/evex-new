import { defineSandbox } from "eve/sandbox";
import { vercel } from "eve/sandbox/vercel";

export default defineSandbox({
  backend: vercel({
    runtime: "node24",
    resources: {
      vcpus: 2,
    },
  }),
});
