import joi from 'joi'
import get from 'lodash/get'

export default function setPageInfo(data, totalCount, first, offset) {
  joi.assert(first, joi.number().integer().min(0).required(), 'first')
  joi.assert(offset, joi.number().integer().min(0).required(), 'offset')
  joi.assert(totalCount, joi.number().integer().min(0).required(), 'totalCount')

  const pageCount = get(data, 'length', 0)
  const hasNextPage = ((first + offset) < totalCount)
  const hasPreviousPage = (offset > 0)

  return {
    totalCount,
    pageCount,
    hasNextPage,
    hasPreviousPage,
  }
}
