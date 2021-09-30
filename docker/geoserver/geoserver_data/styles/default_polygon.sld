<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"
    xmlns="http://www.opengis.net/sld"
    xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <!-- a named layer is the basic building block of an sld document -->

  <NamedLayer>
    <Name>World Countries</Name>
    <UserStyle>
        <!-- they have names, titles and abstracts -->

      <Title>World Countries</Title>
      <Abstract>A sample style that just prints out a grey interior with a black outline</Abstract>
      <!-- FeatureTypeStyles describe how to render different features -->
      <!-- a feature type for polygons -->

      <FeatureTypeStyle>
        <!--FeatureTypeName>Feature</FeatureTypeName-->
        <Rule>
          <Name>Rule 1</Name>
          <Title>Grey Fill and Black Outline</Title>
          <Abstract>Grey fill with a black outline 1 pixel in width</Abstract>

          <!-- like a linesymbolizer but with a fill too -->
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#000050</CssParameter>
              <CssParameter name="opacity">0.5</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#030050</CssParameter>
              <CssParameter name="stroke-width">5</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
        <Rule>
        <TextSymbolizer>
            <Label>
              <ogc:PropertyName></ogc:PropertyName>
            </Label>
            <Font>
              <CssParameter name="font-family">DejaVu Sans</CssParameter>
              <CssParameter name="font-size">10</CssParameter>
              <CssParameter name="font-style">normal</CssParameter>
              <CssParameter name="font-weight">bold</CssParameter>
            </Font>
            <LabelPlacement>
              <PointPlacement>
                <AnchorPoint>
                  <AnchorPointX>0.5</AnchorPointX>
                  <AnchorPointY>0.0</AnchorPointY>
                </AnchorPoint>
              </PointPlacement>
            </LabelPlacement>
            <Fill>
              <CssParameter name="fill">#FFFFFF</CssParameter>
            </Fill>
          </TextSymbolizer>
          </Rule>

        </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>