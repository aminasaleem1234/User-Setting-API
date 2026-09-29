const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', '..', 'data', 'userSettings.json');

async function readAll() {
  const text = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(text || '[]');
}


async function writeAll(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

async function findOne(userId) {
  const all = await readAll();
  return all.find(item => item.userId === userId) || null;
}

async function create(settings) {
  const all = await readAll();
  all.push(settings);
  await writeAll(all);
  return settings;
}

async function update(userId, changes) {
  const all = await readAll();
  const index = all.findIndex(item => item.userId === userId);
  if (index === -1) return null;

  all[index] = { ...all[index], ...changes };
  await writeAll(all);
  return all[index];
}

async function remove(userId) {
  const all = await readAll();
  const index = all.findIndex(item => item.userId === userId);
  if (index === -1) return false;

  all.splice(index, 1);
  await writeAll(all);
  return true;
}

module.exports = { readAll, writeAll, findOne, create, update, remove };