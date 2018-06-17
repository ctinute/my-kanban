import {database} from './firebase-app';

export const computeNewId = async (project) => {
  let baseId = project.name.toString().toLowerCase();
  baseId = baseId.split(' ').join('-');
  let nTry = 0;
  let nextId = baseId;
  let hasId = await isExisted(project.owner, nextId);
  while (hasId) {
    nextId = `${baseId}-${nTry}`;
    nTry++;
    hasId = await isExisted(project.owner, nextId);
  }
  project.id = nextId;
  return project;
};

export const isExisted = async (uid, pid) => {
  let project = await getById(uid, pid);
  return project !== null;
};

export const saveOrUpdate = async (project) => {
  if (!project.id) {
    project = await computeNewId(project);
  }
  const projectDetailPath = `/projectsByUser/${project.owner}/${project.id}`;
  const projectListOfUserPath = `/users/${project.owner}/projects/${project.id}`;
  let data = {};
  data[projectDetailPath] = project;
  data[projectListOfUserPath] = {
    name: project.name,
  };
  await database.ref().update(data);
  return getById(project.owner, project.id);
};

export const deleteProject = async (project) => {
  // TODO: implement delete project
};

export const getAll = async (uid) => {
  const path = `/projectsByUser/${uid}/`;
  return database.ref(path).once('value').then((snap) => snap.val());
};
export const getById = async (uid, pid) => {
  const path = `/projectsByUser/${uid}/${pid}`;
  return await database.ref(path).once('value').then((snap) => snap.val());
};


