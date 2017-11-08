import { render } from './view'
import './subs'
import './events'
import { getClient } from '@mccue/django-swagger'

render()
console.log(getClient())
