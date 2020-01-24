# Expansion Panel and Accordion

These components are meant to be used together, when **app-expansion-panel** is wrapped with the **accordion** it's going to keep only one panel open all the time.
User cannot open two in the same time. That's been controled by the accordion.

## Usage of Expansion Panel

There are two ng-content in the panel:
  * title
  * body

So, when it's used you need to specify what's going to be treated as the title, and what's going to be treated as a panel body.

```
  <app-expansion-panel>
    <p title>Title</p>
    <div body>Body of panel</div>
  </app-expansion-panel>
```

You also can specify **key** which is used when you want call **AccordionComponent#open** method and to open one of the panels with just a key. This can be useful
when you want to open one component by default, depending on some input.


## Usage of both components together

```
  <app-accordion>
    <app-expansion-panel key="key1">
      <p title>Title 1</p>
      <div body>Body of panel 1</div>
    </app-expansion-panel>
    <app-expansion-panel key="key2">
      <p title>Title 2</p>
      <div body>Body of panel 2</div>
    </app-expansion-panel>
  </app-accordion>
```

Accordion will open and close panels when it's needed, it will keep only one open.