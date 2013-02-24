<?xml version='1.0' encoding='utf-8'?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!--
Name: Navigation
Version: 1.0
-->

<xsl:variable name="tab"/>
<xsl:variable name="destination"/>
<xsl:variable name="data"/>

<xsl:template name="left-nav-render">
	<xsl:param name="active"/>
	<xsl:param name="destinations" select="//data/destinations-all/entry" />
	
	<div class="nav-left">
		<div class="nav-left-wrapper">
			<div class="pane level-one"> 
				
				<div class="nav-left-inner">
					
					<h1>Our Destinations</h1>
					<ul>
					<xsl:for-each select="$destinations">
						<li class="item">
							<a href="{$root}/destination/{name/@handle}" class="link-level-one">
								<xsl:value-of select="name"/>
							</a>
						</li>
					</xsl:for-each>	
					</ul>
				</div>
			</div>
			
			<!-- Render the panes -->
			<xsl:for-each select="$destinations">
				
				<xsl:variable name="this-destination" select="."/>
			
				<div>
					<xsl:attribute name="class">
						<xsl:choose>
							<xsl:when test="$active = $this-destination/name/@handle">pane active level-two pane-<xsl:value-of select="$this-destination/name/@handle"/></xsl:when>
							<xsl:otherwise>pane hidden level-two pane-<xsl:value-of select="$this-destination/name/@handle"/></xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
	
					<div class="nav-left-inner">
						<div class="back-button">
							<a href="{$root}" class="link-level-one"><span></span></a>
						</div>
						<h1>
							<a href="{$root}/destination/{name/@handle}/" class="link-level-two"><xsl:value-of select="name"/></a>
						</h1>
						
						<ul>
							<xsl:call-template name="tab-selector-item">
								<xsl:with-param name="text" select="'The Low Down'" />
								<xsl:with-param name="this-tab" select="'the-low-down'" />
								<xsl:with-param name="destination" select="$this-destination/name/@handle" />
							</xsl:call-template>
							
							<xsl:call-template name="tab-selector-item">
								<xsl:with-param name="text" select="'Hotels'" />
								<xsl:with-param name="this-tab" select="'hotels'" />
								<xsl:with-param name="destination" select="$this-destination/name/@handle" />
							</xsl:call-template>
							
							<xsl:if test="//data/packages-all/entry[destination/item/@handle = $this-destination/name/@handle]">
								<xsl:call-template name="tab-selector-item">
									<xsl:with-param name="text" select="'Packages'" />
									<xsl:with-param name="this-tab" select="'packages'" />
									<xsl:with-param name="destination" select="$this-destination/name/@handle" />
								</xsl:call-template>
							</xsl:if>
							
							<xsl:for-each select="//data/activity-types-all/entry">
								<xsl:call-template name="tab-selector-item">
									<xsl:with-param name="text" select="title" />
									<xsl:with-param name="this-tab" select="title/@handle" />
									<xsl:with-param name="destination" select="$this-destination/name/@handle" />
									<xsl:with-param name="subnav">
										<xsl:variable name="type" select="title/@handle"/>
										<xsl:for-each select="//data/activity-categories-all/entry[type/item/@handle = $type]">
											
											<xsl:variable name="id" select="@id"/>
											
											<xsl:if test="count($this-destination/activities/item[category/item/@id = $id]) &gt; 0">
												
												<!-- if only one item then link straight to it -->
												<xsl:choose>
													<xsl:when test="count(/activities/item[category/item/@id = $id]) = 1">
														<xsl:variable name="single-activity" select="activities/item[category/item/@id = $id]"/>
														<xsl:call-template name="tab-selector-item">
															<xsl:with-param name="text" select="title" />
															<xsl:with-param name="destination" select="$this-destination/name/@handle" />
															<xsl:with-param name="this-tab" select="concat($single-activity/category/item/@handle , '/', $single-activity/title/@handle,'/')" />
														</xsl:call-template>	
													</xsl:when>
													<xsl:otherwise>
														<xsl:call-template name="tab-selector-item">
															<xsl:with-param name="text" select="title" />
															<xsl:with-param name="destination" select="$this-destination/name/@handle" />
															<xsl:with-param name="this-tab" select="title/@handle" />
														</xsl:call-template>
													</xsl:otherwise>
												</xsl:choose>
											</xsl:if>
											
										</xsl:for-each>
									</xsl:with-param>
								</xsl:call-template>	
							</xsl:for-each>
							
							<xsl:if test="group-bookings-overview">
								<xsl:call-template name="tab-selector-item">
									<xsl:with-param name="text" select="'Group Travel'" />
									<xsl:with-param name="this-tab" select="'group-travel'" />
									<xsl:with-param name="destination" select="name/@handle" />
								</xsl:call-template>
							</xsl:if>
							
							<xsl:if test="//data/special-offers-all/entry[destination/item/@handle = $this-destination/name/@handle]">
								<xsl:call-template name="tab-selector-item">
									<xsl:with-param name="text" select="'Special Offers'" />
									<xsl:with-param name="this-tab" select="'special-offers'" />
									<xsl:with-param name="destination" select="name/@handle" />
								</xsl:call-template>
							</xsl:if>	
						</ul>
						
					</div>
				</div>
			</xsl:for-each>
			
		</div>
	</div>	
</xsl:template>


<xsl:template name="tab-selector-item">
	<xsl:param name="text" />
	<xsl:param name="this-tab" />
	<xsl:param name="subnav"/>
	<xsl:param name="destination"/>
	<xsl:param name="tab" select="$tab" />
	<xsl:param name="url-stub" select="'destination'" />
	<xsl:param name="level" select="'link-level-two'" />
	

	<li class="clearfix">
		<xsl:attribute name="class">
			<xsl:if test="$tab = $this-tab"> active</xsl:if>
		</xsl:attribute>
		<a class="{$level}" href="{$root}/{$url-stub}/{$destination}/{$this-tab}">
			<span><xsl:value-of select="$text"/></span>
		</a>
		<xsl:if test="$subnav">
			<div class="clear"></div>
			<ul class="subnav clearfix">
				<xsl:copy-of select="$subnav" />
			</ul>
		</xsl:if>
	</li>
</xsl:template>


</xsl:stylesheet>