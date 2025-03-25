const axios = require("axios");

const DRIVE_BASE = "https://drive.google.com/uc?export=download&id=";

const fetchJsonFromDrive = async (fileId) => {
  const url = `${DRIVE_BASE}${fileId}`;
  const res = await axios.get(url);
  return res.data;
};

const fetchProductData = async () => {
  const assignmentFileId = "1gnCtjnlik0IzLnd7hlBpszfRpp_beZRa";
  const chargesFileId = "1mRGpYpJzkpow3TP_88N6v0vXcc4oKLMK";

  const [assignments, charges] = await Promise.all([
    fetchJsonFromDrive(assignmentFileId),
    fetchJsonFromDrive(chargesFileId),
  ]);

  return { assignments, charges };
};

module.exports = { fetchProductData };
