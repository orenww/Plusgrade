const buildReservations = ({ assignments, charges }) => {
  console.log("🔍 Number of assignments:", assignments?.length);
  console.log("🔍 Number of charges:", charges?.length);

  const chargesMap = {};
  for (const charge of charges) {
    if (!charge?.special_product_assignment_id) {
      console.warn("⚠️ Missing assignment ID in charge:", charge);
      continue;
    }

    const id = charge.special_product_assignment_id;
    if (!chargesMap[id]) chargesMap[id] = [];
    chargesMap[id].push(charge);
  }

  const reservationsMap = {};

  for (const assignment of assignments) {
    const { id, reservation_uuid, name } = assignment;
    if (!id || !reservation_uuid) {
      console.warn("⚠️ Missing data in assignment:", assignment);
      continue;
    }

    const relatedCharges = chargesMap[id] || [];

    const latestCharge = relatedCharges[relatedCharges.length - 1];
    const status =
      latestCharge?.active === true
        ? "active"
        : latestCharge?.active === false
        ? "cancelled"
        : "pending";

    const totalCharge = relatedCharges.reduce((sum, c) => {
      return c.active ? sum + c.amount : sum;
    }, 0);

    const productObj = {
      name,
      status,
      charge: totalCharge,
    };

    if (!reservationsMap[reservation_uuid]) {
      reservationsMap[reservation_uuid] = [];
    }

    reservationsMap[reservation_uuid].push(productObj);
  }

  console.log("✅ Grouped reservations:", Object.keys(reservationsMap).length);

  const output = Object.entries(reservationsMap).map(
    ([reservation_uuid, products]) => {
      const activeProducts = products.filter((p) => p.status === "active");
      const active_count = activeProducts.length;
      const active_sum = activeProducts.reduce((sum, p) => sum + p.charge, 0);

      return {
        reservation_uuid,
        active_count,
        active_sum,
        products,
      };
    }
  );

  console.log("✅ Finished transforming reservations");
  return output;
};

module.exports = {
  buildReservations,
};
