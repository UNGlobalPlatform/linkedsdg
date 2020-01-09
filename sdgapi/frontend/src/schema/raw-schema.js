const schemaString = `
@prefix schema: <http://schema.org/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .

# object types

schema:Thing a rdfs:Class ;
    rdfs:comment "Anything." .

schema:Organization a rdfs:Class ;
    rdfs:comment "An organization such as a school, NGO, corporation, club, etc." ;
    rdfs:subClassOf schema:Thing .

schema:Person a rdfs:Class ;
    rdfs:comment "A person" ;
    rdfs:subClassOf schema:Thing .

schema:Country a rdfs:Class ;
    rdfs:comment "A country." ;
    rdfs:subClassOf schema:Place .

schema:Place a rdfs:Class ;
    rdfs:comment "Entities that have a somewhat fixed, physical extension." ;
    rdfs:subClassOf schema:Thing .

schema:PostalAddress a rdfs:Class ;
    rdfs:comment "The mailing address." ;
    rdfs:subClassOf schema:Thing .

schema:Product a rdfs:Class ;
    rdfs:comment "Any offered product or service. For example: a pair of shoes; a concert ticket; the rental of a car; a haircut; or an episode of a TV show streamed online." ;
    rdfs:subClassOf schema:Thing .

schema:Service a rdfs:Class ;
    rdfs:comment "A service provided by an organization, e.g. delivery service, print services, etc." ;
    rdfs:subClassOf schema:Thing .

schema:CreativeWork a rdfs:Class ;
    rdfs:comment "The most generic kind of creative work, including books, movies, photographs, software programs, etc." ;
    rdfs:subClassOf schema:Thing .

schema:Offer a rdfs:Class ;
    rdfs:comment "An offer to transfer some rights to an item or to provide a service — for example, an offer to sell tickets to an event, to rent the DVD of a movie, to stream a TV show over the internet, to repair a motorcycle, or to loan a book." ;
    rdfs:subClassOf schema:Thing .


# data types

schema:Text a schema:DataType, rdfs:Class ;
    rdfs:comment "This is text DataType." .

schema:Date a schema:DataType, rdfs:Class ;
    rdfs:comment "A date value in ISO 8601 date format." .

schema:Number a schema:DataType, rdfs:Class ;
    rdfs:comment "This is number DataType." .

schema:Integer a rdfs:Class ;
    rdfs:comment "This is integer DataType." ;
    rdfs:subClassOf schema:Number .


# properties

schema:employee a rdf:Property ;
    schema:domainIncludes schema:Organization ;
    schema:rangeIncludes schema:Person ;
    schema:inverseOf schema:worksFor ;
    rdfs:comment "An employee of an organization." .

schema:worksFor a rdf:Property ;
    schema:domainIncludes schema:Person ;
    schema:rangeIncludes schema:Organization ;
    schema:inverseOf schema:employee ;
    rdfs:comment "Organizations that the person works for." .

schema:name a rdf:Property, owl:FunctionalProperty ;
    schema:domainIncludes schema:Thing ;
    schema:rangeIncludes schema:Text ;
    rdfs:comment "The name of an entity." .

schema:legalName a rdf:Property, owl:FunctionalProperty ;
    schema:domainIncludes schema:Organization ;
    schema:rangeIncludes schema:Text ;
    rdfs:comment "The official name of the organization, e.g. the registered company name." .

schema:funder a rdf:Property ;
    schema:domainIncludes schema:Organization, schema:Person ;
    schema:rangeIncludes schema:Organization, schema:Person ;
    rdfs:comment "A person or organization that supports (sponsors) something through some kind of financial contribution." ;
    rdfs:subPropertyOf schema:sponsor .

schema:address a rdf:Property ;
    schema:domainIncludes schema:Organization, schema:Person, schema:Place ;
    schema:rangeIncludes schema:PostalAddress, schema:Text ;
    rdfs:comment "Physical address of the item." .

schema:addressCountry a rdf:Property ;
    schema:domainIncludes schema:PostalAddress ;
    schema:rangeIncludes schema:Country, schema:Text ;
    rdfs:comment "The country. For example, USA. You can also provide the two-letter ISO 3166-1 alpha-2 country code." .

schema:manufacturer a rdf:Property ;
   schema:domainIncludes schema:Product ;
    schema:rangeIncludes schema:Organization ;
    rdfs:comment "The manufacturer of the product." .

schema:provider a rdf:Property ;
    schema:domainIncludes schema:Service ;
    schema:rangeIncludes schema:Organization, schema:Person ;
    rdfs:comment "The service provider, service operator, or service performer; the goods producer. Another party (a seller) may offer those services or goods on behalf of the provider. A provider may also serve as the seller." .

schema:isRelatedTo a rdf:Property ;
    schema:domainIncludes schema:Product, schema:Service ;
    schema:rangeIncludes schema:Product, schema:Service ;
    rdfs:comment "A pointer to another, somehow related product (or multiple products)." .

schema:children a rdf:Property ;
    schema:domainIncludes schema:Person ;
    schema:rangeIncludes schema:Person ;
    rdfs:comment "A child of the person." .

schema:parent a rdf:Property ;
    schema:domainIncludes schema:Person ;
    schema:rangeIncludes schema:Person ;
    rdfs:comment "A parent of this person." .

schema:birthPlace a rdf:Property ;
    schema:domainIncludes schema:Person ;
    schema:rangeIncludes schema:Place ;
    rdfs:comment "The place where the person was born." .

schema:birthDate a rdf:Property ;
    schema:domainIncludes schema:Person ;
    schema:rangeIncludes schema:Date ;
    rdfs:comment "Date of birth." .

schema:author a rdf:Property ;
    schema:domainIncludes schema:CreativeWork ;
    schema:rangeIncludes schema:Organization, schema:Person ;
    rdfs:comment "The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably." .

schema:locationCreated a rdf:Property ;
    schema:domainIncludes schema:CreativeWork ;
    schema:rangeIncludes schema:Place ;
    rdfs:comment "The location where the CreativeWork was created, which may not be the same as the location depicted in the CreativeWork." .

schema:about a rdf:Property ;
    schema:domainIncludes schema:CreativeWork ;
    schema:inverseOf schema:subjectOf ;
    schema:rangeIncludes schema:Thing ;
    rdfs:comment "The subject matter of the content." .

schema:subjectOf a rdf:Property ;
    schema:domainIncludes schema:Thing ;
    schema:inverseOf schema:about ;
    schema:rangeIncludes schema:CreativeWork ;
    rdfs:comment "A CreativeWork or Event about this Thing." .

schema:position a rdf:Property ;
    schema:domainIncludes schema:CreativeWork ;
    schema:rangeIncludes schema:Integer, schema:Text ;
    rdfs:comment "The position of an item in a series or sequence of items." .

schema:offeredBy a rdf:Property ;
    schema:domainIncludes schema:Offer ;
    schema:inverseOf schema:makesOffer ;
    schema:rangeIncludes schema:Organization, schema:Person ;
    rdfs:comment "A pointer to the organization or person making the offer." .

schema:makesOffer a rdf:Property ;
    schema:domainIncludes schema:Organization, schema:Person ;
    schema:inverseOf schema:offeredBy ;
    schema:rangeIncludes schema:Offer ;
    rdfs:comment "A pointer to products or services offered by the organization or person." .

schema:areaServed a rdf:Property ;
    rdfs:label "areaServed" ;
    schema:domainIncludes schema:Offer, schema:Organization, schema:Service ;
    schema:rangeIncludes schema:Place, schema:Text ;
    rdfs:comment "The geographic area where a service or offered item is provided." .

schema:addOn a rdf:Property ;
    schema:domainIncludes schema:Offer ;
    schema:rangeIncludes schema:Offer ;
    rdfs:comment "An additional offer that can only be obtained in combination with the first base offer (e.g. supplements and extensions that are available for a surcharge)." .

schema:itemOffered a rdf:Property ;
    schema:domainIncludes schema:Offer ;
    schema:rangeIncludes schema:Product, schema:Service ;
    rdfs:comment "The item being offered." .

schema:price a rdf:Property, owl:FunctionalProperty ;
    schema:domainIncludes schema:Offer ;
    schema:rangeIncludes schema:Number, schema:Text ;
    rdfs:comment "The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes." .

schema:priceValidUntil a rdf:Property, owl:FunctionalProperty ;
    rdfs:label "priceValidUntil" ;
    schema:domainIncludes schema:Offer ;
    schema:rangeIncludes schema:Date ;
    rdfs:comment "The date after which the price is no longer available." .

schema:offers a rdf:Property ;
    schema:domainIncludes schema:CreativeWork, schema:Product, schema:Service ;
    schema:rangeIncludes schema:Offer ;
    rdfs:comment "An offer to provide this item&#x2014;for example, an offer to sell a product, rent the DVD of a movie, perform a service, or give away tickets to an event." .

`

module.exports = schemaString