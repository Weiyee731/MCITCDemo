import React from 'react'

export const isNullOrEmptyString = (text) => { return (typeof text !== "undefined" && text !== null && text.trim() !== '') ? false : true }