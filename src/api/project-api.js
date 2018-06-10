import {database} from './firebase-app';
import * as authenticationAPI from './auth-api';

export const getSpecificProjectOfCurrentUser = async (projectId) => {
  const uid = authenticationAPI.getCurrentUser().uid;
  const path = `/users/${uid}/projects/${projectId}`;
  return await database.ref(path).once('value').then((snap) => snap.val());
};

export const hasId = async (id) => {
  return await getProjectsOfSpecificUser(id) !== null;
};

export const saveProject = async (project) => {
  const projectDetailPath = `/projectsByUser/${project.owner}/${project.id}`;
  const projectListOfUserPath = `/users/${project.owner}/projects/${project.id}`;
  let data = {};
  data[projectDetailPath] = project;
  data[projectListOfUserPath] = {
    name: project.name,
  };
  return database.ref().update(data);
};

export const updateProject = async (project) => {
  // const pathToSave = `/${project.ownerId}/projects/`;
  // return firebase.database().ref(pathToSave).push(project);
};

export const deleteProject = async (project) => {
  // TODO: implement function
};

export const getProjectsOfSpecificUser = async (uid) => {
  const path = `/projectsByUser/${uid}/`;
  return await database.ref(path).once('value').then((snap) => snap.val());
};

export const getProjectsOfCurrentUser = async () => {
  const uid = authenticationAPI.getCurrentUser().uid;
  return await getProjectsOfSpecificUser(uid);
};
