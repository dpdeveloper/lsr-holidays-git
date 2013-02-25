<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="xml"
	omit-xml-declaration="yes"/>

<xsl:include href="../utilities/string.xsl" />
<xsl:include href="../utilities/json.xsl" />
<xsl:include href="../utilities/json-utils.xsl" />

<xsl:template match="/">
	<!--
		NB: HTML Encode must be enabled in the DS
	-->
	
	
	<xsl:variable name="j">
		<xsl:call-template name="xml-to-json">
			<xsl:with-param name="xml">
				<response>success</response>
				<deals>
					<xsl:for-each select="data/deals-all/entry">
						<deal>
							<title>
								<xsl:value-of select="title"/>
							</title>
							<overview>
								<xsl:value-of select="overview"/>
							</overview>
							<xsl:call-template name="render-image-for-json">
								<xsl:with-param name="image" select="image/item" />
							</xsl:call-template>
							<order>
								<xsl:value-of select="order"/>
							</order>
							<published>
								<xsl:value-of select="published"/>
							</published>
							<description>
								<xsl:copy-of select="description/node()" />
							</description>
						</deal>
					</xsl:for-each>
					<xsl:if test="count(data/deals-all/entry) = 1"><deal>NULL</deal></xsl:if>
				</deals>
			</xsl:with-param>
		</xsl:call-template>
	</xsl:variable>
	
	jsonCallback(
	<xsl:call-template name="string-replace-all">
		<xsl:with-param name="text" select="$j" />
		<xsl:with-param name="replace" select="',&quot;NULL&quot;'" />
		<xsl:with-param name="by" select="''" />
	</xsl:call-template>
	);
</xsl:template>


</xsl:stylesheet>