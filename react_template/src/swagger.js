'use strict'
/*
This module contains all the code required for working with the swagger backend
*/
import Swagger from 'swagger-client'
import cookie from 'cookie'
import {memoize} from 'lodash'

const CSRFTOKEN = cookie.parse(document.cookie).csrftoken
const SPEC_URL = buildSpecUrl();

/**
returns url that the spec is stored at. Loads from window.PRELOAD.swagger_url
defaults to /docs?format=openapi
*/
function buildSpecUrl() {
  let {protocol, host} = window.location
  let url = window.PRELOAD.swagger_url || '/docs?format=openapi'
  return `${protocol}//${host}${url}`
}

/**
returns if the given httpMethod should send a csrftoken with the request
*/
function shouldSendCSRF(httpMethod) {
  return !(['GET', 'HEAD', 'OPTIONS', 'TRACE'].includes(httpMethod))
}

/**
Mutates req to have an X-CSRFToken header with a value of csrftoken if the
method of req is an unsafe http method
*/
function attachCSRF(req, csrftoken) {
  if (shouldSendCSRF(req.method)) {
    req.headers['X-CSRFToken'] = csrftoken
  }
  return req
}

/**
returns a swagger client using the given swagger_spec that properly handles
passing a csrftoken
*/
async function makeSwaggerClient(swagger_spec, csrftoken) {
  return Swagger({
    url: `data:application/json,${swagger_spec}`,
    requestInterceptor: req => attachCSRF(req, csrftoken)
  })
}

/**
returns a Swagger client given the url for its spec and a csrftoken to attach
to unsafe requests
*/
async function getClientFromSpec(spec_url, csrftoken) {
  let res = await fetch(spec_url)
  let json = await res.json()
  let spec = JSON.stringify(json)
  return makeSwaggerClient(spec, csrftoken)
}

export const getClient =
  memoize(async () => getClientFromSpec(SPEC_URL, CSRFTOKEN))
