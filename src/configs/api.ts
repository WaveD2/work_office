import { APIHost, APIUrl } from '../utils/constants';

enum APIService {
  auth,
  protected,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    console.log(APIHost);
    
    return `${APIUrl}/api/auth`;
  } else if (service === APIService.protected) {
    return `${APIHost}/protected`;
  } else if (service === APIService.public) {
    return `${APIHost}`;
  }

  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.auth)}/login`,
  userProfile: `${getBaseUrl(APIService.public)}/user`,
};
