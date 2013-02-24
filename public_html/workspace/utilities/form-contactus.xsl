<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
	version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:exsl="http://exslt.org/common"
	xmlns:form="http://nick-dunn.co.uk/xslt/form-controls"
	extension-element-prefixes="exsl form">
	
	
<xsl:template name="form-contact-us">
	<xsl:param name="message" />
	<div class="contact-us">
		<xsl:choose>
			<xsl:when test="$form:event/@result='success'">
				<div class="form-success">
				<h2>Thank you</h2>
					<p>
						Thank you for your enquiry. We will get back to you shortly.
					</p>
				</div>
				
			</xsl:when>	
			<xsl:otherwise>
			
				<form id="message-new" action="" method="post">
	
					<div class="form-item clearfix {$form:event/name/@type}">
						<div class="form-l">
							<label for="fields-name">Name</label>
						</div>
						<div class="form-r">
							<xsl:call-template name="form:input">
								<xsl:with-param name="handle" select="'name'"/>
								<xsl:with-param name="class" select="'text'"/>
								<xsl:with-param name="tabindex" select="'50'" />
							</xsl:call-template>
							
							<xsl:if test="$form:event/name/@type">
								<div class="error"><xsl:value-of select="$form:event/name/@message"/></div>
							</xsl:if>
						</div>
					</div>				
				
					<div class="form-item clearfix {$form:event/email/@type}">
						<div class="form-l">
							<label for="fields-email">Email</label>
						</div>
						<div class="form-r">
							<xsl:call-template name="form:input">
								<xsl:with-param name="handle" select="'email'"/>
								<xsl:with-param name="class" select="'text'"/>
								<xsl:with-param name="tabindex" select="'50'" />
							</xsl:call-template>
							
							<xsl:if test="$form:event/email/@type">
								<div class="error"><xsl:value-of select="$form:event/email/@message"/></div>
							</xsl:if>
						</div>
					</div>					
				
					<div class="form-item clearfix {$form:event/telephone/@type}">
						<div class="form-l">
							<label for="fields-telephone">Telephone</label>
						</div>
						<div class="form-r">
							<xsl:call-template name="form:input">
								<xsl:with-param name="handle" select="'telephone'"/>
								<xsl:with-param name="class" select="'text'"/>
								<xsl:with-param name="tabindex" select="'50'" />
							</xsl:call-template>
							
							<xsl:if test="$form:event/telephone/@type">
								<div class="error"><xsl:value-of select="$form:event/telephone/@message"/></div>
							</xsl:if>
						</div>
					</div>		
	
	
					<div class="form-item clearfix {$form:event/message/@type}">
						<div class="form-l">
							<label for="fields-message">Message</label>
						</div>
						<div class="form-r">
							<xsl:call-template name="form:textarea">
								<xsl:with-param name="handle" select="'message'"/>
								<xsl:with-param name="class" select="'textarea'"/>
								<xsl:with-param name="rows" select="'6'"/>
								<xsl:with-param name="cols" select="'150'"/>
								<xsl:with-param name="tabindex" select="'40'" />
								<xsl:with-param name="value" select="$message"/>
							</xsl:call-template>
							
							<xsl:if test="$form:event/message/@type">
								<div class="error"><xsl:value-of select="$form:event/message/@message"/></div>
							</xsl:if>
						</div>
					</div>				
					
					<div class="form-submit">
						<div class="submit-wrapper">
							<input type="submit" class="action-button action-next btn-arrow right" name="action[new-message]" id="action-new-message" value="Submit"/>
							<span class="btn-arrow right white"></span>
						</div>
					</div>
			
				</form>
			
			</xsl:otherwise>
		</xsl:choose>
	</div>
</xsl:template>

	
</xsl:stylesheet>