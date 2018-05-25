import {database} from './firebase-app';

export const saveProject = async (project) => {
    const path = `/projectsByUser/${project.owner}/`;
    const key = await database.ref(path).push().key;
    let data = {};
    data[path] = project;
    data[`/users/projects/${key}`] = {
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
    const path = `/users/${uid}/projects/`;
    return await database.ref(path).once('value').then((snap) => snap.val());
};
