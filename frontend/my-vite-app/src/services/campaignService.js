import api from "./api";

export const saveCampaign = async (campaignData) => {
  const res = await api.post("/campaigns", campaignData);
  return res.data;
};

export const getCampaigns = async () => {
  const res = await api.get("/campaigns");
  return res.data;
};
