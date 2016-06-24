export const BASE_PAGE_DIR = ''
export const BASE_ROUTER_DIR = ''
export let BASE_STATIC_DIR = '/app-static/img/agent'


export const CREATION = 'creation'
export const UPDATING = 'updating'
export const BROWSE = 'browse'

export const AGENT_LEVEL = [
	{value: '1', text: '合伙人级代理'},
	{value: '2', text: '大区代理'},
	{value: '3', text: '省代理'},
	{value: '4', text: '一级代理'},
	{value: '5', text: '二级代理'},
	{value: '6', text: '分销商'}
]

export let FETCH_CITIES ='http://www.mielseno.com/app/get_province_city'

export let FETCH_SUCCESS = '0'

// ajax base directory
export let FETCH_BASE_URL = '/AppAdmin'

export let FETCH_LOGIN = FETCH_BASE_URL + '/login'
export let FETCH_UPLOAD_IMG = FETCH_BASE_URL + '/upload_image'
export let FETCH_ADD_AGENT = FETCH_BASE_URL + '/add_agent'
export let FETCH_AGENT = FETCH_BASE_URL + '/search_agent'
export let FETCH_DELETE_AGENT = FETCH_BASE_URL + '/delete_agent'
