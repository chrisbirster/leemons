async function getAdminDashboard({ program, start, end } = {}) {
  return leemons.api(`dashboard/admin?program=${program}&start=${start}&end=${end}`, {
    allAgents: true,
    method: 'GET',
  });
}

async function getAdminDashboardRealtime() {
  return leemons.api(`dashboard/admin/realtime`, {
    allAgents: true,
    method: 'GET',
  });
}

export { getAdminDashboard, getAdminDashboardRealtime };
