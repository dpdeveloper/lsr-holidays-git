<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="xml"
	omit-xml-declaration="yes"/>

<xsl:include href="../utilities/string.xsl" />
<xsl:include href="../utilities/json.xsl" />

<xsl:template match="/">
	<!--
		NB: HTML Encode must be enabled in the DS
	-->
	
	<xsl:variable name="entry" select="data/home-about/entry"/>
	
	<xsl:variable name="j">
		<xsl:call-template name="xml-to-json">
			<xsl:with-param name="xml">
				<response>success</response>
				<about>
					<header>
						<xsl:copy-of select="$entry/header/node()" />
					</header>
					<column1>
						<xsl:copy-of select="$entry/column-1/node()" />
					</column1>
					<column2>
						<xsl:copy-of select="$entry/column-2/node()" />
					</column2>
					<column3>
						<xsl:copy-of select="$entry/column-3/node()" />
					</column3>
				</about>
			</xsl:with-param>
		</xsl:call-template>
	</xsl:variable>
	
	<!-- HACK for array output (not needed in this case) -->
	
	jsonCallback(
	<xsl:call-template name="string-replace-all">
		<xsl:with-param name="text" select="$j" />
		<xsl:with-param name="replace" select="',&quot;NULL&quot;'" />
		<xsl:with-param name="by" select="''" />
	</xsl:call-template>
	);
</xsl:template>


</xsl:stylesheet>