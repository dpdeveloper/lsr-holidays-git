<?xml version="1.0" encoding="utf-8"?>
<!-- json-utils.xsl
 * JSON funcitons	
 *
 * Author: David Anderson 2010
-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:import href="json.xsl"/>
<xsl:import href="image-format.xsl"/>


<!--
	<xsl:call-template name="render-multiple-images-for-json">
		<xsl:with-param name="images" select="" />
	</xsl:call-template>
-->
<xsl:template name="render-multiple-images-for-json">
	<xsl:param name="images" />	
	
	<xsl:for-each select="$images">
		<xsl:call-template name="render-image-for-json">
			<xsl:with-param name="image" select="." />
		</xsl:call-template>
	</xsl:for-each>
</xsl:template>


<xsl:template name="render-image-for-json">
	<xsl:param name="image" />
	<image>
		<id><xsl:value-of select="@id"/></id>
		<title><xsl:value-of select="title"/></title>
		<filename><xsl:value-of select="image/filename"/></filename>
		<path><xsl:value-of select="image/@path"/></path>
		<height><xsl:value-of select="image/meta/@height"/></height>
		<width><xsl:value-of select="image/meta/@width"/></width>
	</image>
	
</xsl:template>



</xsl:stylesheet>