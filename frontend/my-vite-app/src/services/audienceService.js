import api from "./api";

export const getAudienceCount = async (rule) => {
  const res = await api.post("/audience-count", { rule });
  return res.data;
};
