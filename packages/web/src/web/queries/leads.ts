import { useMutation } from "@tanstack/react-query";
import { orpc } from "../lib/api";

/** Multi-step qualifier submission. */
export function useCreateLead() {
  return useMutation(orpc.leads.create.mutationOptions());
}

/** Email-gated buyer's guide, used by the guide section and exit-intent modal. */
export function useRequestGuide() {
  return useMutation(orpc.leads.requestGuide.mutationOptions());
}
