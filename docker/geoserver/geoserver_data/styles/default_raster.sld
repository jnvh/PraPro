<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld
http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd" version="1.0.0">
<UserLayer>
	<Name>raster_layer</Name>
	<UserStyle>
		<Name>raster</Name>
		<Title>Opaque Raster</Title>
		<Abstract>A sample style for rasters</Abstract>
		<FeatureTypeStyle>
	        <FeatureTypeName>Feature</FeatureTypeName>
			<Rule>
				<RasterSymbolizer>
				    <ColorMap>
                      	<ColorMapEntry color="#FFCC32" quantity="-1" label="label1" opacity="0"/>
       				 	<ColorMapEntry color="#ffffff" quantity="0" label="1" opacity="1"/>
        				<ColorMapEntry color="#c27500" quantity="100" label="100" opacity="1"/>
					</ColorMap>
				</RasterSymbolizer>
			</Rule>
		</FeatureTypeStyle>
	</UserStyle>
</UserLayer>
</StyledLayerDescriptor>