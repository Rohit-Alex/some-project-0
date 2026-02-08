// ==============================|| GLOBAL TYPES ||============================== //

import { API_STATUS } from '../constants/apiStatus'

/**
 * API status type - derived from API_STATUS constant
 */
export type ApiStatus = (typeof API_STATUS)[keyof typeof API_STATUS]

