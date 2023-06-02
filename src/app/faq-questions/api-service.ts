import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://t3-language-service.cognitiveservices.azure.com/language/:query-knowledgebases';
  private subscriptionKey = '6475ef2a58264943a5761cc5d5b9507a';
  private apiVersion = '2021-10-01';
  private deploymentName = 'test';
  private projectName = 'test-1';
  constructor(private http: HttpClient) { }

  public postQueryToKnowledgeBase(question: string) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': this.subscriptionKey
    });

    const body = {
      top: 3,
      question: question,
      includeUnstructuredSources: true,
      confidenceScoreThreshold: '0.5',
      answerSpanRequest: {
        enable: false,
        topAnswersWithSpan: 1,
        confidenceScoreThreshold: '0.5'
      },
      filters: {}
    };

    const params = new HttpParams()
      .set('api-version', this.apiVersion)
      .set('deploymentName', this.deploymentName)
      .set('projectName', this.projectName);


    const options = {
      headers: headers,
      params: params
    };

    return this.http.post(this.apiUrl, body, options);
  }
}
