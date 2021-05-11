
const replacingPathParams = (host, originalPath, params = {}) => {


  const pathArr = originalPath.path.split('/');

  const pathVariables = pathArr.filter((item) => {
    return item.includes(":");
  });

  if(Object.keys(params).length === pathVariables.length) {

    if(Object.keys(params).length > 0) {

      for (const prop in params) {
        let indexOfElement = pathArr.indexOf(`:${prop}`);

        if(indexOfElement !== -1){
          pathArr[indexOfElement] = params[prop];
        }
      }

    }

    for(let i = 0; i < pathArr.length; i++) {
      if(pathArr[i].includes(":")) {
        return 404;
      }
    }

    return {
      method: originalPath.method,
      url: `${host}${pathArr.join('/')}`
    }
  }

  return 404;
}

export { replacingPathParams } 