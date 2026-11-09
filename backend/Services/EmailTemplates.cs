using System.Net;

namespace Ordo.Api.Services;

public static class EmailTemplates
{
    private const string Font = "Geist,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

    public static string ConfirmEmail(string name, string link)
    {
        var safeName = WebUtility.HtmlEncode(name);
        var safeLink = WebUtility.HtmlEncode(link);

        return
          $$"""
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="color-scheme" content="dark">
            <meta name="supported-color-schemes" content="dark">
            <title>Confirm your Ordo account</title>
          </head>
          <body style="margin:0; padding:0; background-color:#09090b;">
            <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:#09090b;">Confirm your email to activate your Ordo account.</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#09090b" style="background-color:#09090b;">
              <tr>
                <td align="center" style="padding:40px 16px;">
                  <table role="presentation" width="480" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:480px;">
                    <tr>
                      <td bgcolor="#18181b" style="background-color:#18181b; border:1px solid #27272a; border-radius:16px; padding:32px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="font-family:{{Font}}; font-size:24px; line-height:32px; font-weight:600; color:#fafafa; padding-bottom:8px;">Confirm your email</td>
                            </tr>
                            <tr>
                              <td style="font-family:{{Font}}; font-size:14px; line-height:22px; color:#a1a1aa; padding-bottom:24px;">Hi {{safeName}}, thanks for signing up for Ordo. Confirm your email address to activate your account and start organizing your projects.</td>
                            </tr>

                            <tr>
                              <td style="padding-bottom:24px;">
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td bgcolor="#818cf8" style="background-color:#818cf8; border-radius:8px;">
                                      <a href="{{safeLink}}" style="display:block; padding:10px 20px; font-family:{{Font}}; font-size:14px; line-height:20px; font-weight:500; color:#09090b; text-decoration:none; border-radius:8px;">Confirm email</a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>

                            <tr>
                              <td style="border-top:1px solid #27272a;padding-top:20px; font-family:{{Font}}; font-size:12px; line-height:18px; color:#a1a1aa;">
                                Button not working? Paste this link into your browser:<br>
                                <a href="{{safeLink}}" style="color:#818cf8; text-decoration:none; word-break:break-all;">{{safeLink}}</a>
                              </td>
                            </tr>
                          </table>
                      </td>
                    </tr>

                    <tr>
                      <td align="center" style="padding-top:24px; font-family:{{Font}}; font-size:12px; line-height:18px; color:#71717a;">
                        This link expires in 24 hours. If you didn't create an Ordo account, you can safely ignore this email.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      """;
    }
}