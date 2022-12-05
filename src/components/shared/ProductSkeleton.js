// react
import React, { Component } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductSkeleton = (props) => {

    const baseColor = props !== undefined && props.baseColor
    const highlightColor = props !== undefined && props.highlightColor

    return (
        <div className="product-skeleton" >
            <div className="product__info">
                <div className="product__wishlist-compare">

                </div>
                <Skeleton height={40} baseColor={baseColor} highlightColor={highlightColor} />

                <Skeleton height={20} baseColor={baseColor} highlightColor={highlightColor} />

                <ul className="product__meta">
                </ul>
                <Skeleton height={20} baseColor={baseColor} highlightColor={highlightColor} />
            </div>

            <div className="product__sidebar" style={{ paddingTop: "15pt" }}>
                <Skeleton height={40} width={150} baseColor={baseColor} highlightColor={highlightColor} />
                <Skeleton height={40} width={100} baseColor={baseColor} highlightColor={highlightColor} />
                <div className="product__option">

                    <div className="form-group product__option product__add-to-cart" >
                        <div className="product__actions">
                            <div className="product__actions-item product__actions-item--addtocart mx-1">
                                <Skeleton height={30} width={40} baseColor={baseColor} highlightColor={highlightColor} />
                            </div>
                            <div className="product__actions-item product__actions-item--wishlist mx-1">
                                <Skeleton height={30} width={20} baseColor={baseColor} highlightColor={highlightColor} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductSkeleton