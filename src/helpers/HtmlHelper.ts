import $ from 'jquery';

export const render = (content: string): void => {
    $('.container').empty();
    $('.container').append(content);
};