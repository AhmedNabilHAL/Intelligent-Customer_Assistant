from transformers import BertTokenizerFast
from transformers import EncoderDecoderModel
from spacy_langdetect import LanguageDetector
import json
import spacy
from spacy.language import Language
import preprocessor as p
import re
import pandas as pd
import string
import emoji

class Cleaner:
  def __init__(self):

    self.nlp = None
    self.info_json = None

    def get_lang_detector(nlp, name):
      return LanguageDetector()

    # try:
    #   with open('/content/drive/MyDrive/abcd data/info.json') as json_file:
    #     self.info_json = json.load(json_file) 
    # except Exception as e:
    #   print(e)
    #   self.info_json = None


    try:
      self.nlp = spacy.load("en_core_web_sm")
      Language.factory("language_detector", func=get_lang_detector)
      self.nlp.add_pipe('language_detector', last=True)
    except Exception as e:
      print(e)

  def remove_special(self, text):
    # removes @ mentions, hashtags, emojis, twitter reserved words and numbers
    p.set_options(p.OPT.EMOJI, p.OPT.MENTION, p.OPT.RESERVED, p.OPT.SMILEY, p.OPT.NUMBER, p.OPT.HASHTAG)
    clean = p.clean(text)

    # transforms every url to "<url>" token and every hashtag to "<hashtag>" token
    p.set_options(p.OPT.EMOJI, p.OPT.MENTION, p.OPT.RESERVED, p.OPT.SMILEY, p.OPT.NUMBER, p.OPT.URL)
    clean = p.tokenize(clean)

    # transforms every url to "<url>" token and every hashtag to "<hashtag>" token
    clean = re.sub(r'\$URL\$', '<url>', clean)
    return clean

  def clean_text(self, text):
    if pd.isnull(text):
      return text
    text = text.lower()

    if self.info_json is not None:
      for customer_name in self.info_json['customer_name']:
        text = text.replace(customer_name, '<name>')
      for account_id in self.info_json['account_id']:
        text = text.replace(account_id, '<id>')

    clean = self.remove_special(text)
    clean = self.remove_entites(clean)

    # remove punctuation
    my_punc = string.punctuation.replace('<', '')
    my_punc = my_punc.replace('>', '')
    clean = clean.translate(str.maketrans('', '', my_punc))

    clean = self.remove_special(clean)

    # preprocessor doesn't seem to clean all emojis so we run text trough emoji regex to clean leftovers
    # clean = re.sub(emoji.get_emoji_regexp(), '', clean)
    clean = emoji.replace_emoji(clean, replace='')

    # removing zero-width character which is often bundled with emojis & remove any text after '^' character
    # which usually signifies a customer support agent signing his initials
    clean = re.sub(u'\ufe0f|(\^.*)', '', clean)

    # remove multiple empty spaces with one
    clean = re.sub(r' +', ' ', clean)

    # clean = re.sub(r'\^.*', '', clean)

    # replace &gt; and &lt;
    clean = re.sub(r'&gt;', '>', clean)
    clean = re.sub(r'&lt;', '<', clean)

    # strip any leftover spaces at the beginning and end
    clean = clean.lower()
    clean = clean.strip()

    return clean

  def isenglish(self, text):
    doc = self.nlp(text)
    return True if doc._.languages and ('en' in doc._.language_scores and doc._.language_scores['en'] >= 0.80) else False
    # return doc._.languages

  def remove_entites(self, text):
    doc = self.nlp(text)
    return ' '.join([t.text if not t.ent_type_ else '<' + t.ent_type_ + '>' for t in doc])

  def clean_data(self, df):
    # remove non-english text
    # df = df[df.question.apply(self.isenglish)]
    # df = df[df.answer.apply(self.isenglish)]

    # clean twitter data
    for col_name, _ in df.iteritems():
      df.loc[:, col_name] = df[col_name].apply(self.clean_text)
    return df

import os
from gp.settings import BASE_DIR
file_path = os.path.join(BASE_DIR, 'chat')
file_path = os.path.join(file_path, 'ML')
tokenizer = BertTokenizerFast.from_pretrained("bert-base-uncased")
model = EncoderDecoderModel.from_pretrained(file_path)
cleaner = Cleaner()
def getReply(history,message):
  newHistory = []
  for m in history:
    newHistory.append(cleaner.clean_text(m))
  user_input = cleaner.clean_text(message)

  newHistory.append(user_input)

  inputs = tokenizer(' ' + tokenizer.cls_token + ' '.join(newHistory), padding="max_length", truncation=True, max_length=512, return_tensors="pt")
  input_ids = inputs.input_ids
  attention_mask = inputs.attention_mask

  # translate example
  output_ids = model.generate(input_ids=input_ids, attention_mask=attention_mask,
                              temperature=1.0,
                              top_k=0,
                              top_p=0.9,
                              repetition_penalty=1.0)[0]
  output = tokenizer.decode(output_ids, skip_special_tokens=True)
  
  # decode and print
  return output

  