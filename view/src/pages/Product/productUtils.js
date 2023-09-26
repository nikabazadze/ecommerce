export const getProductColors = (product) => {
    if (!product) return [];
    return product.productVariants.map((variant, index) => (
        {
            id: index,
            name: variant.colorName,
            code: variant.colorCode
        }
    ));
};

export const getAccordionItems = (product) => {
    const result = [
        {
            id: 3,
            title: "Shipping and Delivery",
            content: <p>Free shipping order over $65+ <br /><br />We offer regular or express shipping to most addresses worldwide. Shipping cost and delivery times are calculated at checkout. <br /><br />Note: P.O. box deliveries will automatically be sent by regular shipping.</p>
        },
    ];

    // Assemble specs
    const specs = [];
    product.specifications.forEach(spec => {
        specs.push(<li key={spec.name}>{`${spec.name}: ${spec.content}`}</li>);
    });
    const specsContent = <ul>{specs.map(spec => ( spec ))}</ul>
    result.unshift({
        id: 2,
        title: "Specifications",
        content: specsContent
    });

    // Asemble features
    const featuresContent = <ul>
                                {product.features.map((feature) => ( <li key={feature.id}>{feature.content}</li> ))}
                            </ul>
    result.unshift({
        id: 1,
        title: "Features",
        content: featuresContent
    });

    return result;
};

export const getUrl = (product, chosenColor) => {
    if (!product || !chosenColor) return "";
    const variant = product.productVariants.find(variant => variant.colorName === chosenColor.name);
    return variant ? variant.imgUrls[0] : "";
};